#[tauri::command]
pub async fn add_item(name: String, amount: f32, category: String) -> Result<(), String> {
    let db = crate::database::database_connection().await.unwrap();

    let result = sqlx::query("INSERT INTO item (name, amount, category) VALUES (?, ?, ?)")
        .bind(name)
        .bind(amount)
        .bind(category)
        .execute(&db)
        .await;

    println!("{:?}", result);

    return match result {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    };
}
