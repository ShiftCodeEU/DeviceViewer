#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use reqwest;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_devices])
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
