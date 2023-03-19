#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod database;
pub mod models;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_nav_text,
            database::create_database,
            database::select_all_items,
            database::item_actions::add_item
        ])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_nav_text() -> Result<String, String> {
    Ok(String::from("Toggle Nav"))
}
