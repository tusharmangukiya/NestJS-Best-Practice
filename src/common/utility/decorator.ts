import 'reflect-metadata';
import { AppConfig } from '../../../resources/app.config';

const property = (key: string) => {
  return function (target: any, propertyKey: string) {
    let propName: string;

    // Return key value
    const getter = function () {
      return propName;
    };

    // Set the key value from file
    const setter = function () {
      propName = AppConfig.get(key);
    };

    // Overwrite the original message with
    // modifiedMessage we just created
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
};

const deprecated = (key: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const propName = AppConfig.get(key);
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          args.push(propName);
          console.warn(
            `Method ${memberName} is deprecated with reason: ${key}`,
          );
          propertyDescriptor.value.apply(this, args);
        };

        Object.defineProperty(target, memberName, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        });
        return wrapperFn;
      },
    };
  };
};
export { property, deprecated };
