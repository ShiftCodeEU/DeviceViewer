#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[path = "./commands/getLocalDevices.rs"]
mod get_local_iungos;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_local_iungos::query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
