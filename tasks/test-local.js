import gulp from "gulp";
import mocha from "gulp-mocha";
import istanbul from "gulp-istanbul";
import codeClimate from "./codeClimate";
import paths from "../paths.json";

import chai from "chai";
chai.should(); // This enables should-style syntax

gulp.task("test-local", ["build"], (cb) => {
  gulp.src(paths.build.lib)
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on("finish", () => {
      console.log("");
      gulp.src(paths.build.spec)
        .pipe(mocha())
        .pipe(istanbul.writeReports({dir: "./", coverage: true, reporters: ["text-summary", "lcovonly"]})) // Creating the reports after tests ran
		//.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on("end", () => {
          //send report to code climate
          if (process.env.TRAVIS_BUILD_NUMBER) {
            if (process.env.TRAVIS_JOB_NUMBER === `${process.env.TRAVIS_BUILD_NUMBER}.1`) {
              codeClimate("62c878948a8e4e3f9ed8764ee0835816d91ec5c4ed76b24eb83743c0266514d7", cb);
            } else {
              cb();
            }
          } else {
            codeClimate("62c878948a8e4e3f9ed8764ee0835816d91ec5c4ed76b24eb83743c0266514d7", cb);
          }
        });
    });
});
