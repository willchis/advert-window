#include <node.h>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Exception;

void helloMethod(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (args.Length() < 2) {
    isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
      isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
      return;
  }

  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", helloMethod);
}

NODE_MODULE(advertWindow, init)


/* BroadcastSchedule.prototype.matchingAdvertIdAndWithinTimeWindow = function(ipHouseId, minutesEitherSideOfNow) {
    const now = moment().utc();
    const minutesEitherSideOfNowInSeconds = minutesEitherSideOfNow * 60;
    const parsedTime = moment(this.startTime, moment.ISO_8601);
    const timeDiff = Math.abs(parsedTime.diff(now, 'seconds'));
    return this.source && this.source === ipHouseId && timeDiff <= minutesEitherSideOfNowInSeconds;
}; */