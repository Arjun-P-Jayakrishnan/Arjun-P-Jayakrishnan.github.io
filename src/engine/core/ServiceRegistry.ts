import {
  ServiceKey,
  ServiceMap,
  ServiceRegistry,
  ServiceType,
} from "types/service.types";

const createServiceRegistry = (): ServiceRegistry => {
  const services: Map<ServiceKey, ServiceType> = new Map<
    ServiceKey,
    ServiceType
  >();

  const register = <K extends ServiceKey>(
    name: K,
    service: ServiceMap[K]
  ): void => {
    if (services.has(name)) {
      throw new Error(`Error : Redefining the service [${name}]`);
    }
    services.set(name, service);
  };

  const get = <K extends ServiceKey>(name: K): ServiceMap[K] => {
    const service = services.get(name);
    if (!service) {
      throw new Error(
        `Error : Trying to obtain value of an unregistered service ${name}`
      );
    }
    return service as ServiceMap[K];
  };

  const has = (name: ServiceKey): boolean => {
    return services.has(name);
  };

  return {
    register: register,
    get: get,
    has: has,
  };
};

let serviceRegistry: ServiceRegistry | undefined = undefined;

const getServiceRegistry = () => {
  if (!serviceRegistry) {
    serviceRegistry = createServiceRegistry();
  }

  return serviceRegistry;
};

export { getServiceRegistry };
