#import "RCTBridgeModule.h"
#import <ImageIO/ImageIO.h>
#import <CoreGraphics/CoreGraphics.h>

@interface MetaData : NSObject <RCTBridgeModule>
@end

@implementation MetaData
  RCT_EXPORT_MODULE();

  RCT_EXPORT_METHOD(upload:(NSString *)path callback:(RCTResponseSenderBlock)callback)
  {
    CFURLRef url = (__bridge CFURLRef)[NSURL fileURLWithPath:path];
    
    CGImageSourceRef source = CGImageSourceCreateWithURL( (CFURLRef) url, NULL);
    NSDictionary* metadata = (NSDictionary *)CFBridgingRelease(CGImageSourceCopyPropertiesAtIndex(source, 0, NULL));
    callback(@[[NSNull null], metadata]);
  }
@end