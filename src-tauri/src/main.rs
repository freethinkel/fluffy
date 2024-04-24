// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod window;

use cocoa::{
    appkit::{NSColor, NSWindow},
    base::{id, nil},
    foundation::{NSString, NSUserDefaults},
};
use tauri::{Manager, Window, WindowEvent};
use window::{apply_toolbar, ToolbarThickness};

fn main() {
    let mut ctx = tauri::generate_context!();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_pty::init())
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        .setup(|app| {
            let ud: id = unsafe { NSUserDefaults::standardUserDefaults() };
            unsafe {
                ud.setBool_forKey_(
                    false,
                    NSString::alloc(nil).init_str("ApplePressAndHoldEnabled"),
                )
            };
            let window = app.get_webview_window("main").unwrap();

            apply_toolbar(window, ToolbarThickness::Medium);

            Ok(())
        })
        .run(ctx)
        .expect("error while running tauri application");
}
