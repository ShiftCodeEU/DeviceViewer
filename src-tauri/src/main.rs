#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use local_ip_address::local_ip;
use reqwest;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_devices, get_local_ip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn fetch_devices(ip_addresses: Vec<String>) -> Result<Vec<String>, String> {
    let mut responses = Vec::new();
    for ip in ip_addresses {
        let ipaddress = ip;
        let mut url = String::from("http://");
        url.push_str(&ipaddress);
        let response = reqwest::get(&url).await.map_err(|e| e.to_string())?;
        responses.push(response.text().await.map_err(|e| e.to_string())?);
    }
    Ok(responses)
}

#[tauri::command]
async fn get_local_ip() -> Result<Vec<String>, String> {
    let mut responses = Vec::new();
    let local_ip = local_ip().unwrap();
    responses.push(local_ip.to_string());

    Ok(responses)
}
