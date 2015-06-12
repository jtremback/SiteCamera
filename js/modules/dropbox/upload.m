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
  NSDictionary *file = obj[@"file"];
  NSString *filepath = file[@"filepath"];

  NSData *data = [NSData dataWithContentsOfFile:filepath];

  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
  [request setURL:[NSURL URLWithString:uploadUrl]];
  [request setHTTPMethod:@"POST"];


  [request addValue:@"image/png" forHTTPHeaderField:@"Content-Type"];

  NSMutableData *body = [NSMutableData data];
  [body appendData:[NSData dataWithData:data]];
  [request setHTTPBody:body];

  NSData *returnData = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
  NSString *returnString = [[NSString alloc] initWithData:returnData encoding:NSUTF8StringEncoding];

  NSLog(@"Ret: %@",returnString);
}

@end
