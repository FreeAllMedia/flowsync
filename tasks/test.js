import gulp from "gulp";

gulp.task("test", ["test-local", "test-browsers"]);

// Browsers are failing. See: https://www.pivotaltracker.com/n/projects/1366342/stories/97586636
// gulp.task("test", ["test-local", "test-browsers"]);
