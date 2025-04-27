import bcrypt from "bcryptjs";

// NOTE: this function should be called as mongosseHook before schema definition
//       Where `this` refer to the document itself
export async function hashPasswordHook(next) {
  if (!this.isModified("password")) return next();
  // I don't care about the performance of this function, nor the Hash Robustness.
  this.password = await bcrypt.hash(this.password, 5);
  this.passwordConfirm = undefined;
  next();
}
