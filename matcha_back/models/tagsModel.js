SELECT tags.title, COUNT(tags.title)
FROM tags
INNER JOIN profiles_tags ON tags.id = profiles_tags.tag_id
GROUP BY tags.title
ORDER BY `COUNT(tags.title)` DESC, profiles_tags.tag_id ASC