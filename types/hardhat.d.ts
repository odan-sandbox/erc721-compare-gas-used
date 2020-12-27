declare var task: typeof import("hardhat/config").task;

// task 型がったので不要になった
// declare function task(name: string, description?: string, action?: import("hardhat/types").ActionType<import("hardhat/types").ArgumentType>): import("hardhat/types").ConfigurableTaskDefinition;

// import type なので OK
// https://twitter.com/meows_whiskers/status/1343133316480815106
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
declare var hre: import("hardhat/types").HardhatRuntimeEnvironment;

// モジュールを import するとこのファイルもモジュールになっちゃうのでNG
// https://twitter.com/uhyo_/status/1343123685880688641
// import type { HardhatRuntimeEnvironment } from "hardhat/types"
// declare var hre: HardhatRuntimeEnvironment;
