const menuItemReviewsFixtures = {
    oneReview: {
        "itemId": 1,
        "reviewerEmail": "test_email1@ucsb.edu",
        "stars": 5,
        "comments": "amazing",
        "dateReviewed": "2022-01-02T12:00:00"
    },
    threeReviews: [
        {
            "itemId": 1,
            "reviewerEmail": "test_email1@ucsb.edu",
            "stars": 5,
            "comments": "amazing",
            "dateReviewed": "2022-01-02T12:00:00"
        },
        {
            "itemId": 2,
            "reviewerEmail": "test_email2@ucsb.edu",
            "stars": 4,
            "comments": "yum",
            "dateReviewed": "2022-03-03T12:00:00"
        },
        {
            "itemId": 3,
            "reviewerEmail": "test_email3@ucsb.edu",
            "stars": 1,
            "comments": "trash",
            "dateReviewed": "2022-05-04T12:00:00"
        }
    ]
};


export { menuItemReviewsFixtures };