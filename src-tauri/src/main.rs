extern crate hyper;

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn getLocalIungos(iprange: Box<[i32]>) {
    let client = Client::new();
    let availableClients: Box<[i32]> = Box::new([]);
    let res = client.get("http://example.domain").send().unwrap();

    for current in 0..iprange.len() {
        println!("{}", lang[current]);
    }
}
