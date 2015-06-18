#import "RCTBridgeModule.h"
#import <ImageIO/ImageIO.h>

@interface FileMetadata : NSObject <RCTBridgeModule>
@end

@implementation FileMetadata
  RCT_EXPORT_MODULE();

  RCT_EXPORT_METHOD(getMetadata:(NSString *)path callback:(RCTResponseSenderBlock)callback)
  {
    CFURLRef url = (__bridge CFURLRef)[NSURL fileURLWithPath:path];

    CGImageSourceRef source = CGImageSourceCreateWithURL( (CFURLRef) url, NULL);
    NSDictionary* metadata = (NSDictionary *)CFBridgingRelease(CGImageSourceCopyPropertiesAtIndex(source, 0, NULL));
    callback(@[[NSNull null], metadata]);
  }
@end