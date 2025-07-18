import csv
import json
import os

def read_csv(file_path):
    with open(file_path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return [row for row in reader]

def build_genre_dict(genre_rows):
    return {row["id"]: row for row in genre_rows}

def get_genres(genre_ids_str, genre_dict):
    ids = [id_.strip() for id_ in genre_ids_str.split(",") if id_.strip()]
    genres = []
    for id_ in ids:
        genre = genre_dict.get(id_)
        if genre:
            genres.append({
                "id": genre["id"],
                "name": genre["nombre"],
                "descripcion": genre["descripcion"]
            })
    return genres

def clean_row(row, genre_dict):
    return {
        "id": row.get("id"),
        "name": row.get("nombre"),
        "release": row.get("fecha_salida"),
        "genre": get_genres(row.get("genero", ""), genre_dict),
        "description": row.get("sinopsis"),
        "image": row.get("image"),
        "episodes": int(row.get("cantidad_episodios", 0)),
        "link_imdb": row.get("link_imdb"),
        "video":"",
        "punctuation": float(row.get("promedio_puntuaciones_imdb", 0))
    }

def main():
    base_dir = os.path.dirname(__file__)
    serie = os.path.join(base_dir, "Serie-2024-12-08.csv")
    genero = os.path.join(base_dir, "Genero-2024-12-08.csv")

    genre_rows = read_csv(genero)
    genre_dict = build_genre_dict(genre_rows)

    # Guardar los géneros en un archivo aparte
    with open(os.path.join(base_dir, "genres_db.json"), "w", encoding="utf-8") as f:
        json.dump(genre_rows, f, ensure_ascii=False, indent=2)

    rows = read_csv(serie)
    all_rows = [clean_row(row, genre_dict) for row in rows]

    with open(os.path.join(base_dir, "anime_db.json"), "w", encoding="utf-8") as f:
        json.dump(all_rows, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()