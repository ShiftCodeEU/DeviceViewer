use reqwest::Error;
use serde::Deserialize;

#[path = "../main.rs"]
mod tauri_main;

#[tauri::command]
pub async fn query(iprange: String) {
    let availableClients: String = &std("");

    if (iprange == nill) {
        Err("Missing iprange array".into());
    }

    for current in 0..iprange.len() {
        let request_url = format!("https://{ip}", ip = current);
        let response = reqwest::get(&request_url).await?;

        let deviceRes = response.text().await?;

        if (deviceRes && deviceRes.contains("iungo")) {
            availableClients = availableClients + &std(",") + deviceRes;
        }
    }
    Ok(availableClients.into());
}
