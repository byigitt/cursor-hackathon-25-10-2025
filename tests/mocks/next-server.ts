// Mock for next/server module in tests
export class NextRequest {}
export class NextResponse {
  static json(data: any) {
    return data;
  }
  static redirect(url: string) {
    return { redirect: url };
  }
}
