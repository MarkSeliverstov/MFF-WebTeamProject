async function getData() {
fetch("http://localhost:5050/api/execution", {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },

  body: JSON.stringify({
    url: "https://yawning-yam.com",
    title: "",
    crawlTimeStart: 1695514182385,
    crawlTimeEnd: 1695514182385,
    links: [],
    groupId: 1,
    ownerId: "650f5cd1da70012602682af5",
    sitesCrawled: 0,
    root: true,
    status: "running",
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Fetch successful:", data);
    return data;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
}

getData();
