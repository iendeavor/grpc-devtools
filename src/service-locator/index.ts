import { ConfigInMemoryDataSource } from "@/data-sources/config-in-memory-data-source";
import { ConfigLocalDataSource } from "@/data-sources/config-local-data-source";
import { DetailInMemoryDataSource } from "@/data-sources/detail-in-memory-data-source";
import { FilterInMemoryDataSource } from "@/data-sources/filter-in-memory-data-source";
import { RequestRowsChromeDevtoolsDataSource } from "@/data-sources/request-rows-chrome-devtools-data-source";
import { RequestRowsInMemoryDataSource } from "@/data-sources/request-rows-in-memory-data-source";
import { RequestRowsLocalDataSource } from "@/data-sources/request-rows-local-data-source";
import { ConfigRepo } from "@/repos/config-repo";
import { FilterRepo } from "@/repos/filter-repo";
import { RequestRowsRepo } from "@/repos/request-rows-repo";

export const Tokens = {
  ConfigInMemoryDataSource: "ConfigInMemoryDataSource",
  ConfigLocalDataSource: "ConfigLocalDataSource",
  DetailInMemoryDataSource: "DetailInMemoryDataSource",
  FilterInMemoryDataSource: "FilterInMemoryDataSource",
  RequestRowsChromeDevtoolsDataSource: "RequestRowsChromeDevtoolsDataSource",
  RequestRowsInMemoryDataSource: "RequestRowsInMemoryDataSource",
  RequestRowsLocalDataSource: "RequestRowsLocalDataSource",

  ConfigRepo: "ConfigRepo",
  FilterRepo: "FilterRepo",
  RequestRowsRepo: "RequestRowsRepo",
} as const;

const singletons = {} as {
  ConfigInMemoryDataSource: ConfigInMemoryDataSource;
  ConfigLocalDataSource: ConfigLocalDataSource;
  DetailInMemoryDataSource: DetailInMemoryDataSource;
  FilterInMemoryDataSource: FilterInMemoryDataSource;
  RequestRowsChromeDevtoolsDataSource: RequestRowsChromeDevtoolsDataSource;
  RequestRowsInMemoryDataSource: RequestRowsInMemoryDataSource;
  RequestRowsLocalDataSource: RequestRowsLocalDataSource;

  ConfigRepo: ConfigRepo;
  FilterRepo: FilterRepo;
  RequestRowsRepo: RequestRowsRepo;
};

singletons[Tokens.ConfigInMemoryDataSource] = new ConfigInMemoryDataSource();
singletons[Tokens.ConfigLocalDataSource] = new ConfigLocalDataSource();
singletons[Tokens.DetailInMemoryDataSource] = new DetailInMemoryDataSource();
singletons[Tokens.FilterInMemoryDataSource] = new FilterInMemoryDataSource();
singletons[Tokens.RequestRowsChromeDevtoolsDataSource] =
  new RequestRowsChromeDevtoolsDataSource();
singletons[Tokens.RequestRowsInMemoryDataSource] =
  new RequestRowsInMemoryDataSource();
singletons[Tokens.RequestRowsLocalDataSource] =
  new RequestRowsLocalDataSource();

singletons[Tokens.ConfigRepo] = new ConfigRepo();
singletons[Tokens.FilterRepo] = new FilterRepo();
singletons[Tokens.RequestRowsRepo] = new RequestRowsRepo();

export function resolve<Token extends keyof typeof Tokens>(
  token: Token
): typeof singletons[Token] {
  return singletons[token];
}
