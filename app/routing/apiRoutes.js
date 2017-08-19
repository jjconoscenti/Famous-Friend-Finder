var friendListData = require("../data/friends");

module.exports = function(app) {
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends
    app.get("/api/friends", function(req, res) {
        res.json(friendListData);
    });
    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function(req, res) {
        var userData = (req.body);
        console.log(userData);
        var allUserDifferences = friendListData.map(function(friend, index) {
            // var friendScores = friend.scores;
            // allUserDifferences = [];
            // allFriendsDifferences.push(allUserDifferences);
            var totalDifference = 0;
            for (var i = 0; i < friend.scores.length; i++) {
                totalDifference += Math.abs(friend.scores[i] - userData.answers[i]);
            }
            var userDifference = {
                total: totalDifference,
                index: index
            };
            return userDifference
        })
        console.log(allUserDifferences);
        var sortedDifferences = allUserDifferences.sort();
        console.log(sortedDifferences);
        var matchedFriend = allUserDifferences.reduce(function(max, cur) {
            if (cur.total > max.total) {
                return cur
            } else {
                return max
            };

        });
        var result = friendListData[matchedFriend.index];
        console.log(result);
        console.log(matchedFriend);
        res.json(result);
    });
};