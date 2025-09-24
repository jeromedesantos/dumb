## Database Query Example: Suggested Users to Follow

This section explains a specific SQL query used to suggest users for a user to follow.

### Scenario

Let's imagine a simple scenario with 5 users in the database:

*   You (user_id: `u-1`)
*   Budi (user_id: `u-2`)
*   Citra (user_id: `u-3`)
*   Dani (user_id: `u-4`)
*   Eka (user_id: `u-5`)

You are already following Budi and Citra. This is recorded in the `Following` table:

| id  | follower_id | following_id |
| --- | ----------- | ------------ |
| f-1 | u-1         | u-2          |
| f-2 | u-1         | u-3          |

### The Query

Here is the SQL query to find users you are not yet following:

```sql
SELECT
    id, username, full_name, photo_profile, bio
FROM "User"
WHERE
    id NOT IN (
        SELECT "following_id"
        FROM "Following"
        WHERE "follower_id" = '${user_id}'
    )
    AND id != '${user_id}'
ORDER BY ${sortBy} ${order}
OFFSET ${offset} LIMIT ${limit}
```

### Step-by-Step Explanation

1.  **Sub-query:**
    ```sql
    SELECT "following_id"
    FROM "Following"
    WHERE "follower_id" = 'u-1'
    ```
    This query finds all the IDs of the people you follow. The result is a list: `['u-2', 'u-3']`.

2.  **Main Query:**
    ```sql
    SELECT ...
    FROM "User"
    WHERE id NOT IN ('u-2', 'u-3')
    ```
    This retrieves all users from the `User` table, excluding those whose IDs are in the list from the sub-query. So, Budi (`u-2`) and Citra (`u-3`) are excluded.

3.  **Additional Condition:**
    ```sql
    AND id != 'u-1'
    ```
    This condition ensures that your own ID (`u-1`) is not included in the results.

### Final Result

The query will return the remaining users that you don't follow yet: Dani (`u-4`) and Eka (`u-5`).

This is a very effective way to build a "Suggested Users to Follow" feature.
