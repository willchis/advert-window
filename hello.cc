#include <nan.h>

using namespace v8;

// The following NAN expands to: "void Method(const v8::FunctionCallbackInfo<v8::Value>& args)""
NAN_METHOD(sayHello) {
  auto message = Nan::New<v8::String>("I'm a Node Hero!").ToLocalChecked();
  info.GetReturnValue().Set(message);
}

void Init(Handle<Object> exports) {
  exports->Set(Nan::New("hello").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(sayHello)->GetFunction());
}

NODE_MODULE(hello, Init) // first arg should match the target in the binding.gyp file