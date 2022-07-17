import { ConfigInMemoryDataSource } from "@/data-sources/config-in-memory-data-source";
import { ConfigLocalDataSource } from "@/data-sources/config-local-data-source";
import { Config } from "@/entities/config";
import { resolve, Tokens } from "@/service-locator";
import { Observable } from "rxjs";

export class ConfigRepo {
  private isHydrated = false;
  private configInMemoryDataSource: ConfigInMemoryDataSource;
  private configLocalDataSource: ConfigLocalDataSource;

  constructor(
    configInMemoryDataSource = resolve(Tokens.ConfigInMemoryDataSource),
    configLocalDataSource = resolve(Tokens.ConfigLocalDataSource)
  ) {
    this.configInMemoryDataSource = configInMemoryDataSource;
    this.configLocalDataSource = configLocalDataSource;
  }

  private hydrate = (): void => {
    if (this.isHydrated) return;
    this.isHydrated = true;
    const persistedConfig = this.configLocalDataSource.get();
    this.configInMemoryDataSource.patch(persistedConfig ?? {});
  };

  persist = (): void => {
    const config = this.get();
    this.configLocalDataSource.patch(config);
  };

  get = (): Config => {
    this.hydrate();

    return this.configInMemoryDataSource.get();
  };

  patch = (config: Partial<Config>): void => {
    this.hydrate();

    this.configInMemoryDataSource.patch(config);
    this.persist();
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<Config>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    return this.configInMemoryDataSource.subscribe(subscriber);
  };
}
