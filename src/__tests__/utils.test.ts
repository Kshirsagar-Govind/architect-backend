import bcrypt from 'bcryptjs';
import { hashPlainText } from '../utils/hashPassword';

describe('Password hashing', () => {
  it("Hash the password", async () => {
    let rawText = '12345';
    let hashedValue = await hashPlainText(rawText);
    const match = await bcrypt.compare(rawText, hashedValue);
    expect(match).toBe(true);
  })
})
