const fs = require("fs");

/*
    A function to delete file as specified by its full path.
    @prams : pathList - A list of paths of files to be deleted.
*/
const deleteFile = (pathList) => {
    console.log(pathList);
    try {
        for (var i = 0; i < pathList.length; i++) {
            to_delete = pathList[i];
            try {
                fs.unlinkSync(to_delete);
                console.log("Deleted");
            } catch (error) {
                console.log(error);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { deleteFile };