use serde::Serialize;
use sqlx::FromRow;

#[derive(Clone, FromRow, Debug, Serialize)]
pub struct Item {
    name: String,
    amount: f32,
    date: String,
    category: String,
}
