import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useSignUp } from "@clerk/expo";
import AuthShell from "@/components/AuthShell";
import AuthField from "@/components/AuthField";
import PrimaryButton from "@/components/PrimaryButton";
import { track } from "@/services/analytics";
import { getErrorMessage, validateEmail, validatePassword } from "@/utils/validation";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const busy = fetchStatus === "fetching";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const finalize = async () => {
    await signUp.finalize({
      // The (auth) layout redirects to Profile once signed in, so we only handle extra steps here.
      navigate: ({ session }) => {
        if (session?.currentTask) {
          setFormError("Your account needs an extra step that this demo does not support yet.");
        }
      },
    });
    track("sign_up_completed", { method: "email_password" });
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setFieldErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setFormError(null);

    // signUp.password automatically initializes/resets the sign-up attempt
    const { error } = await signUp.password({ emailAddress: email.trim(), password });
    if (error) {
      setFormError(getErrorMessage(error));
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) setFormError(getErrorMessage(sendError));
  };

  const handleVerify = async () => {
    if (code.trim().length < 6) {
      setFormError("Enter the 6-digit code from your email.");
      return;
    }
    setFormError(null);
    const { error } = await signUp.verifications.verifyEmailCode({ code: code.trim() });
    if (error) {
      setFormError(getErrorMessage(error));
      return;
    }
    if (signUp.status === "complete") {
      await finalize();
    } else {
      setFormError("We couldn't complete your sign-up. Please try again.");
    }
  };

  const needsVerification =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  if (needsVerification) {
    const codeError = errors.fields.code?.message;
    return (
      <AuthShell title="Check your email" subtitle="We sent a 6-digit verification code to your email address.">
        <AuthField
          label="Verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          placeholder="123456"
          maxLength={6}
          error={codeError}
        />
        {formError && !codeError ? <Text className="mb-3 font-body text-sm text-red-600">{formError}</Text> : null}
        <PrimaryButton label="Verify and continue" onPress={handleVerify} loading={busy} />
        
        <View className="mt-5 flex-row justify-between px-2">
          <Pressable onPress={() => signUp.verifications.sendEmailCode()} hitSlop={8}>
            <Text className="font-body-medium text-sm text-gold">Send a new code</Text>
          </Pressable>

          <Pressable 
            onPress={async () => {
              setFormError(null);
              setCode("");
              // Re-initiates sign-up using current email/password inputs
              await signUp.password({ emailAddress: email.trim(), password });
            }} 
            hitSlop={8}
          >
            <Text className="font-body-medium text-sm text-muted">Start over</Text>
          </Pressable>
        </View>
      </AuthShell>
    );
  }

  const emailMessage = fieldErrors.email ?? errors.fields.emailAddress?.message;
  const passwordMessage = fieldErrors.password ?? errors.fields.password?.message;

  return (
    <AuthShell title="Create account" subtitle="Join LUXE to save your details and unlock membership.">
      <AuthField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder="you@example.com"
        error={emailMessage}
      />
      <AuthField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholder="At least 8 characters"
        error={passwordMessage}
      />
      {formError && !emailMessage && !passwordMessage ? (
        <Text className="mb-3 font-body text-sm text-red-600">{formError}</Text>
      ) : null}
      <PrimaryButton label="Create account" onPress={handleSubmit} loading={busy} />

      <View className="mt-6 flex-row justify-center">
        <Text className="font-body text-sm text-muted">Already have an account? </Text>
        <Link href="/sign-in" replace>
          <Text className="font-body-semibold text-sm text-gold">Sign in</Text>
        </Link>
      </View>

      {/* Needed by Clerk's bot protection on web only. Ignored on iOS and Android. */}
      <View nativeID="clerk-captcha" />
    </AuthShell>
  );
}