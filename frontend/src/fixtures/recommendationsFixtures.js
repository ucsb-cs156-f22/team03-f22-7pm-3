const recommendationsFixtures = {
    oneRecommendation: {
		"id": 1,
        "requesterEmail": "ilikepancakes@gmail.com",
        "professorEmail": "ilikewaffles@gmail.com",
        "explanation": "hungry",
        "dateRequested": "2022-01-02T12:00:01",
        "dateNeeded": "2022-01-02T12:00:02",
        "done": true,
    },
    threeRecommendations: [
        {
			"id": 1,
            "requesterEmail": "ilikeburritos@gmail.com",
            "professorEmail": "iliketacos@gmail.com",
            "explanation": "hungrytoo",
            "dateRequested": "2022-01-02T12:00:03",
            "dateNeeded": "2022-01-02T12:00:04",
            "done": false,
        },
        {
			"id": 2,
            "requesterEmail": "ilikesushi@gmail.com",
            "professorEmail": "ilikespammusubi@gmail.com",
            "explanation": "veryhungry",
            "dateRequested": "2022-01-02T12:00:04",
            "dateNeeded": "2022-01-02T12:00:05",
            "done": true,
        },
        {
			"id": 3,
            "requesterEmail": "ilikespaghetti@gmail.com",
            "professorEmail": "ilikelasagne@gmail.com",
            "explanation": "fogetaboutit",
            "dateRequested": "2022-01-02T12:00:05",
            "dateNeeded": "2022-01-02T12:00:06",
            "done": true,
        } 
    ]
};


export { recommendationsFixtures };
