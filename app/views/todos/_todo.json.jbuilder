if todo.nil?
  json.null!
else
  json.extract! todo,
    :id,
    :content,
    :completed
end