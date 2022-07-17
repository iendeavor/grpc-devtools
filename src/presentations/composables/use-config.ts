import { Config } from "@/entities/config";
import { resolve, Tokens } from "@/service-locator";
import { useEffect, useState } from "react";

const useConfig = () => {
  const configRepo = resolve(Tokens.ConfigRepo);
  const [config, setConfig] = useState<Config>(configRepo.get());
  useEffect(() => {
    const subscription = configRepo.subscribe((config) => {
      setConfig(config);
    });
    return () => subscription.unsubscribe();
  }, []);

  const setConfig2 = (config: Config) => {
    configRepo.patch(config);
  };

  return [config, setConfig2] as const;
};

export default useConfig;
