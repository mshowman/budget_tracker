pub mod item_actions;

use crate::models::item::Item;
use sqlx::{migrate::MigrateDatabase, Error, Pool, Sqlite, SqlitePool};

const DB_URL: &str = "sqlite://budget_tracker.db";

#[tauri::command]
pub async fn create_database() {
    if !Sqlite::database_exists(DB_URL).await.unwrap_or(false) {
        println!("Creating database {}", DB_URL);
        match Sqlite::create_database(DB_URL).await {
            Ok(_) => println!("Create db success"),
            Err(error) => panic!("error: {}", error),
        }
    } else {
        println!("Database already exists");
    }

    create_table(String::from(
        "CREATE TABLE IF NOT EXISTS item (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name varchar NOT NULL,
            amount real NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            category varchar
        );",
    ))
    .await;

    let db = database_connection().await.unwrap();
    sqlx::query("INSERT INTO item (name, amount, category) VALUES (?, ?, ?)")
        .bind("Test")
        .bind(300.34)
        .bind("BILLS")
        .execute(&db)
        .await
        .unwrap();
}

#[tauri::command]
pub async fn select_all_items() -> Result<Vec<Item>, String> {
    let db = database_connection().await.unwrap();

    let result = sqlx::query_as::<_, Item>("select * from item;")
        .fetch_all(&db)
        .await
        .unwrap();
    return Ok(result);
}

async fn database_connection() -> Result<Pool<Sqlite>, Error> {
    return Ok(SqlitePool::connect(DB_URL).await.unwrap());
}

async fn create_table(sql_to_execute: String) {
    let db = database_connection().await.unwrap();

    let result = sqlx::query(&sql_to_execute).execute(&db).await.unwrap();

    println!("Create Item table result: {:?}", result);
}
