
# Emurgo API Test for GNews API

This is Coderbyte Test for fetching news articles from GNews API.




## Deployment

To deploy this project run

```bash
  npm start
```


## API Reference

#### Fetching N new articles

```http
  GET /articles/new/${count}
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------  |
| `count`   | `number` | **Required**. Should be > 0 |

#### Find new articles by title or author

```http
  GET /articles/find
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`   | `string` | Article title. it can not be empty if author is empty.                     |
| `author`  | `string` | Article author, it can not be empty if title is empty.                     |

#### Fetching N new articles

```http
  GET /articles/search
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :-------------------------    |
| `keyword`   | `string` | **Required**. search string |

