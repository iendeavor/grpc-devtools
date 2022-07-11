import { Config } from "@/entities/config";

const key = "grpc-devtools-config";

export class ConfigLocalDataSource {
  get = (): Pick<Config, "shouldPreserveLog"> => {
    return JSON.parse(
      sessionStorage.getItem(key) ?? JSON.stringify({ shouldRecord: true })
    );
  };

  patch = (config: Pick<Config, "shouldPreserveLog">): void => {
    const persistedConfig = this.get();
    console.log(config);
    sessionStorage.setItem(
      key,
      JSON.stringify({ ...persistedConfig, ...config })
    );
  };
}
