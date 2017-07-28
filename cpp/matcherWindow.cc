#include <node.h>
#include <ctime>
#include <time.h>
#include <nan.h>
#include <cmath>
#include <iostream>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Exception;

void checkWindow(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // arg 0 = source (from schedule)
  // arg 1 = advert id (to match source)
  // arg 2 = startTime of item in schedule
  // arg 3 = minutesEitherSideOfNow (window for matching)

  if (args.Length() < 3) {
    isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  if (!args[3]->IsNumber()) {
      isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments - last arg should be a value in minutes, for +/- of now")));
      return;
  }

  //TODO - check other args

  Local<v8::String> source(args[0]->ToString());
  Local<v8::String> advertId(args[1]->ToString());

  int timeWindowMinutes = args[3]->NumberValue();

  Nan::Utf8String timeString(args[2]->ToString());
  char * timeChars = *timeString;
  struct tm timeIntermediate;
  strptime(timeChars, "%Y-%m-%dT%H:%M:%S.000%Z", &timeIntermediate);
  
  time_t scheduleTime = timegm(&timeIntermediate) - timezone;

  // Check if the time passed in is within +/- timeWindowMinutes of now
  time_t now = time(0);
  double diffInSeconds = std::abs(difftime(now, scheduleTime));

  bool isWithinWindow = diffInSeconds <= timeWindowMinutes * 60;
  bool matchingId = source == advertId;
  
  args.GetReturnValue().Set(isWithinWindow && matchingId);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "checkWindow", checkWindow);
}

NODE_MODULE(matcherWindow, init)
