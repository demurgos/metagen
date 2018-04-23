import gulp from "gulp";
import minimist, { ParsedArgs } from "minimist";
import * as buildTools from "turbo-gulp";

interface Options {
  devDist?: string;
}

const options: Options & ParsedArgs = minimist(process.argv.slice(2), {
  string: ["devDist"],
  default: {devDist: undefined},
  alias: {devDist: "dev-dist"},
});

const project: buildTools.Project = {
  root: __dirname,
  packageJson: "package.json",
  buildDir: "build",
  distDir: "dist",
  srcDir: "src",
  tslint: {
    configuration: {
      rules: {
        "no-submodule-imports": false,
        "typedef": [
          true,
          "property-declaration",
          "member-variable-declaration",
        ],
      },
    },
  },
};

const lib: buildTools.LibTarget = {
  project,
  name: "lib",
  srcDir: "src/lib",
  scripts: ["**/*.ts"],
  mainModule: "index",
  outModules: buildTools.OutModules.Both,
  dist: {
    packageJsonMap: (old: buildTools.PackageJson): buildTools.PackageJson => {
      const version: string = options.devDist !== undefined ? `${old.version}-build.${options.devDist}` : old.version;
      return <any> {...old, version, scripts: undefined, private: false};
    },
    npmPublish: {
      tag: options.devDist !== undefined ? "next" : "latest",
    },
  },
  tscOptions: {
    skipLibCheck: true,
  },
  typedoc: {
    dir: "typedoc",
    name: "Metagen",
    deploy: {
      repository: "git@github.com:demurgos/metagen.git",
      branch: "gh-pages",
    },
  },
  clean: {
    dirs: ["build/lib", "dist/lib"],
  },
};

const test: buildTools.MochaTarget = {
  project,
  name: "test",
  srcDir: "src",
  outModules: buildTools.OutModules.Both,
  scripts: ["test/**/*.ts", "lib/**/*.ts"],
  tscOptions: {
    skipLibCheck: true,
  },
  copy: [
    {
      src: "test",
      files: ["samples/**/*.midl"],
      dest: "test",
    },
  ],
  clean: {
    dirs: ["build/test"],
  },
};

const main: buildTools.NodeTarget = {
  project,
  name: "main",
  srcDir: "src",
  scripts: ["main/**/*.ts", "lib/**/*.ts"],
  tsconfigJson: "src/main/tsconfig.json",
  mainModule: "main/main",
  tscOptions: {
    skipLibCheck: true,
  },
  clean: {
    dirs: ["build/main", "dist/main"],
  },
};

const libTasks: any = buildTools.registerLibTasks(gulp, lib);
buildTools.registerMochaTasks(gulp, test);
buildTools.registerNodeTasks(gulp, main);
buildTools.projectTasks.registerAll(gulp, project);

gulp.task("all:tsconfig.json", gulp.parallel("lib:tsconfig.json", "test:tsconfig.json", "main:tsconfig.json"));
gulp.task("dist", libTasks.dist);
