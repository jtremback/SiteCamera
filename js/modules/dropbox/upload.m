#import <Foundation/Foundation.h>
#import <MobileCoreServices/MobileCoreServices.h>

#import "RCTBridgeModule.h"
#import "RCTLog.h"

@interface FileUpload : NSObject <RCTBridgeModule>
@end

@implementation FileUpload

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(upload:(NSDictionary *)obj callback:(RCTResponseSenderBlock)callback)
{
  NSString *uploadUrl = obj[@"uploadUrl"];
  NSDictionary *headers = obj[@"headers"];
  NSDictionary *file = obj[@"file"];
  
  NSURL *url = [NSURL URLWithString:uploadUrl];
  NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:url];
  [req setHTTPMethod:@"POST"];

  NSString *filepath = file[@"filepath"];
  NSString *filetype = file[@"filetype"];
  NSData *fileData = [NSData dataWithContentsOfFile:filepath];

  // Content-Length header
  NSString *contentLength = [NSString stringWithFormat:@"%ld", (long)[fileData length]];
  [req setValue:contentLength forHTTPHeaderField:@"Content-Length"];

  // Content-Type header
  if (filetype) {
    [req setValue:filetype forHTTPHeaderField:@"Content-Type"];
  } else {
    NSString *contentType = [self mimeTypeForPath:filepath];
    [req setValue:contentType forHTTPHeaderField:@"Content-Type"];
  }
  
  // User headers
  for (NSString *key in headers) {
    id val = [headers objectForKey:key];
    if ([val respondsToSelector:@selector(stringValue)]) {
      val = [val stringValue];
    }
    if (![val isKindOfClass:[NSString class]]) {
      continue;
    }
    [req setValue:val forHTTPHeaderField:key];
  }

  // Attach data
  [req setHTTPBody:fileData];
  
  // Send request
  NSHTTPURLResponse *response = nil;
  NSData *returnData = [NSURLConnection sendSynchronousRequest:req returningResponse:&response error:nil];
  NSInteger statusCode = [response statusCode];
  NSString *returnString = [[NSString alloc] initWithData:returnData encoding:NSUTF8StringEncoding];
  
  NSDictionary *res=[[NSDictionary alloc] initWithObjectsAndKeys:[NSNumber numberWithInteger:statusCode],@"status",returnString,@"data",nil];
  
  callback(@[[NSNull null], res]);
}

- (NSString *)mimeTypeForPath:(NSString *)filepath
{
  NSString *fileExtension = [filepath pathExtension];
  NSString *UTI = (__bridge_transfer NSString *)UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, (__bridge CFStringRef)fileExtension, NULL);
  NSString *contentType = (__bridge_transfer NSString *)UTTypeCopyPreferredTagWithClass((__bridge CFStringRef)UTI, kUTTagClassMIMEType);

  if (contentType) {
    return contentType;
  }
  return @"application/octet-stream";
}

@end
