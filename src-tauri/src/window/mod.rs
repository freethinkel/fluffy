#![cfg(target_os = "macos")]

use std::ffi::c_void;

use cocoa::{
    appkit::{
        NSColor, NSToolbar, NSWindow, NSWindowButton, NSWindowStyleMask, NSWindowTitleVisibility,
    },
    base::{id, nil, BOOL, NO, YES},
    delegate,
};
use objc::{
    class, msg_send,
    runtime::{Object, Sel},
    sel, sel_impl,
};
use serde::{Deserialize, Serialize};
use tauri::{Manager, WebviewWindow};

#[derive(Serialize, Deserialize, Clone, Debug)]
#[allow(dead_code)]
pub enum ToolbarThickness {
    Thick,
    Medium,
    Thin,
    None,
}

#[cfg(target_os = "macos")]
#[derive(Debug)]
struct FluffyAppState {
    window: WebviewWindow,
}

fn with_app_state<F: FnOnce(&mut FluffyAppState) -> T, T>(this: &Object, func: F) {
    let ptr = unsafe {
        let x: *mut c_void = *this.get_ivar("app_state");
        &mut *(x as *mut FluffyAppState)
    };
    func(ptr);
}

#[allow(deprecated)]
pub fn set_delegate(tauri_win: WebviewWindow) {
    let window = tauri_win.ns_window().unwrap() as id;
    let delegate_name = format!("window_delegate_{}", tauri_win.label());
    let dn = delegate_name.as_str();

    extern "C" fn on_enter_fullscreen(this: &Object, _cmd: Sel, _notification: id) {
        unsafe {
            let window: id = *this.get_ivar("window");
            with_app_state(&*this, |state| state.window.emit("on_enter_fullscreen", ()));
            window.toolbar().setIsVisible_(NO);
        }
    }
    extern "C" fn on_exit_fullscreen(this: &Object, _cmd: Sel, _notification: id) {
        unsafe {
            let window: id = *this.get_ivar("window");
            with_app_state(&*this, |state| state.window.emit("on_exit_fullscreen", ()));
            window.toolbar().setIsVisible_(YES);
        }
    }
    let app_state = Box::into_raw(Box::new(FluffyAppState { window: tauri_win })) as *mut c_void;
    unsafe {
        window.setDelegate_(delegate!(dn, {
            window: id = window,
            app_state: *mut c_void = app_state,
            (windowWillEnterFullScreen:) => on_enter_fullscreen as extern fn(&Object, Sel, id),
            (windowDidExitFullScreen:) => on_exit_fullscreen as extern fn(&Object, Sel, id)
        }));
    }
}

#[allow(deprecated)]
pub fn apply_toolbar(tauri_win: WebviewWindow, thickness: ToolbarThickness) {
    let window = tauri_win.ns_window().unwrap() as id;
    unsafe {
        let masks = window.styleMask()
            | NSWindowStyleMask::NSUnifiedTitleAndToolbarWindowMask
            | NSWindowStyleMask::NSFullSizeContentViewWindowMask
            | NSWindowStyleMask::NSBorderlessWindowMask;

        window.setStyleMask_(masks);
        window.setTitlebarAppearsTransparent_(YES);
        window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden);
        let color = NSColor::colorWithSRGBRed_green_blue_alpha_(nil, 255.0, 255.0, 255.0, 1.0);
        window.setBackgroundColor_(color);
        window.setHasShadow_(YES);

        match thickness {
            ToolbarThickness::Thick => {
                tauri_win.set_title("").expect("Title wasn't set to ''");
                window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleVisible);
                make_toolbar(window);
                show_buttons(window)
            }
            ToolbarThickness::Medium => {
                make_toolbar(window);
                show_buttons(window)
            }
            ToolbarThickness::Thin => {}
            ToolbarThickness::None => {
                remove_buttons(window);
            }
        }

        set_delegate(tauri_win);
    }
}

#[cfg(target_os = "macos")]
unsafe fn make_toolbar(id: id) -> id {
    let new_toolbar = NSToolbar::alloc(id);
    new_toolbar.setShowsBaselineSeparator_(NO);
    new_toolbar.init_();
    id.setToolbar_(new_toolbar);

    return new_toolbar;
}

#[cfg(target_os = "macos")]
unsafe fn remove_buttons(window: id) {
    let close_button = window.standardWindowButton_(NSWindowButton::NSWindowCloseButton);
    let min_button = window.standardWindowButton_(NSWindowButton::NSWindowMiniaturizeButton);
    let zoom_button = window.standardWindowButton_(NSWindowButton::NSWindowZoomButton);

    set_hidden(close_button, YES);
    set_hidden(min_button, YES);
    set_hidden(zoom_button, YES);
}

#[cfg(target_os = "macos")]
unsafe fn show_buttons(window: id) {
    let close_button = window.standardWindowButton_(NSWindowButton::NSWindowCloseButton);
    let min_button = window.standardWindowButton_(NSWindowButton::NSWindowMiniaturizeButton);
    let zoom_button = window.standardWindowButton_(NSWindowButton::NSWindowZoomButton);

    set_hidden(close_button, NO);
    set_hidden(min_button, NO);
    set_hidden(zoom_button, NO);
}

#[cfg(target_os = "macos")]
unsafe fn set_hidden(button: id, hidden: BOOL) {
    let _: id = msg_send![button, setHidden: hidden];
}

#[allow(dead_code)]
#[repr(u64)]
#[derive(Clone, Copy, Debug, PartialEq)]
enum NSVisualEffectState {
    FollowsWindowActiveState = 0,
    Active = 1,
    Inactive = 2,
}

#[allow(non_snake_case)]
trait NSVisualEffectView: Sized {
    unsafe fn alloc(_: Self) -> id {
        msg_send![class!(NSVisualEffectView), alloc]
    }

    unsafe fn setState_(self, state: NSVisualEffectState);
}

#[allow(non_snake_case)]
trait ChangeVisible: Sized {
    unsafe fn setIsVisible_(self, state: BOOL);
}

#[allow(non_snake_case)]
impl NSVisualEffectView for id {
    unsafe fn setState_(self, state: NSVisualEffectState) {
        msg_send![self, setState: state]
    }
}

#[allow(non_snake_case)]
impl ChangeVisible for id {
    unsafe fn setIsVisible_(self, state: BOOL) {
        msg_send![self, setVisible: state]
    }
}
