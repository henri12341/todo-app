
export const getTasks = async () => {
    try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    return data

  } catch(err) {
    console.log(err)
  }
};

export const createTask = async (text = null) => {
  console.log("uusi tehtävä")
  console.log(text)
  try {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: text
      })
    }
    )

    const data = await response.json();

    return data;
  }
  catch (err) {
    console.log(err);
    return;
  }
};

export const deleteTask= async (id) => {
  console.log("Task to delete: ",id);

  try {
    const response = await fetch("http://localhost:5000/tasks/", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })

    const data = await response.json();
    return data

  }
  catch (error) {
    console.log(error);
  }

  return {};
};
