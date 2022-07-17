import { Config } from "@/entities/config";
import { z } from "zod";

const key = "grpc-devtools-config";

type PersistentConfig = Pick<
  Config,
  "shouldPreserveLog" | "shouldShowFilterBar"
>;

export class ConfigLocalDataSource {
  get = (): null | PersistentConfig => {
    const configSchema = z
      .object({
        shouldPreserveLog: z.boolean(),
        shouldShowFilterBar: z.boolean(),
      })
      .strip();

    try {
      const config = configSchema.parse(
        JSON.parse(sessionStorage.getItem(key) ?? "null")
      );

      return config;
    } catch (e) {
      return null;
    }
  };

  patch = (config: PersistentConfig): void => {
    const persistedConfig = this.get();
    sessionStorage.setItem(
      key,
      JSON.stringify({ ...persistedConfig, ...config })
    );
  };
}
