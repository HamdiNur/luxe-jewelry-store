import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useSignIn } from "@clerk/expo";
import AuthShell from "@/components/AuthShell";
import AuthField from "@/components/AuthField";
import PrimaryButton from "@/components/PrimaryButton";
import { getErrorMessage, validateEmail } from "@/utils/validation";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const busy = fetchStatus === "fetching";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const finalize = () =>
    signIn.finalize({
      navigate: ({ session }) => {
        if (session?.currentTask) {
          setFormError("Your account needs an extra step that this demo does not support yet.");
        }
      },
    });

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = password ? undefined : "Enter your password.";
    setFieldErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setFormError(null);
    const { error } = await signIn.password({ emailAddress: email.trim(), password });
    if (error) {
      setFormError(getErrorMessage(error));
      return;
    }

    if (signIn.status === "complete") {
      await finalize();
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors?.find((f) => f.strategy === "email_code");
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      } else {
        setFormError("We couldn't verify this device. Please try again.");
      }
    } else if (signIn.status === "needs_second_factor") {
      setFormError("This account uses two-step verification, which this demo does not support yet.");
    } else {
      setFormError("Sign-in could not be completed. Please try again.");
    }
  };

  const handleVerify = async () => {
    if (code.trim().length < 6) {
      setFormError("Enter the 6-digit code from your email.");
      return;
    }
    setFormError(null);
    const { error } = await signIn.mfa.verifyEmailCode({ code: code.trim() });
    if (error) {
      setFormError(getErrorMessage(error));
      return;
    }
    if (signIn.status === "complete") {
      await finalize();
    } else {
      setFormError("We couldn't complete sign-in. Please try again.");
    }
  };

  // Step 2 (new devices only): confirm with an emailed code.
  if (signIn.status === "needs_client_trust") {
    const codeError = errors.fields.code?.message;
    return (
      <AuthShell title="Verify it's you" subtitle="This looks like a new device. We emailed you a 6-digit code.">
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
        <PrimaryButton label="Verify and sign in" onPress={handleVerify} loading={busy} />
        <Pressable onPress={() => signIn.mfa.sendEmailCode()} className="mt-5 items-center" hitSlop={8}>
          <Text className="font-body-medium text-sm text-gold">Send a new code</Text>
        </Pressable>
        <Pressable onPress={() => signIn.reset()} className="mt-4 items-center" hitSlop={8}>
          <Text className="font-body-medium text-sm text-muted">Start over</Text>
        </Pressable>
      </AuthShell>
    );
  }

  const emailMessage = fieldErrors.email ?? errors.fields.identifier?.message;
  const passwordMessage = fieldErrors.password ?? errors.fields.password?.message;

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to see your profile and membership.">
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
        placeholder="Your password"
        error={passwordMessage}
      />
      {formError && !emailMessage && !passwordMessage ? (
        <Text className="mb-3 font-body text-sm text-red-600">{formError}</Text>
      ) : null}
      <PrimaryButton label="Sign in" onPress={handleSubmit} loading={busy} />

      <View className="mt-6 flex-row justify-center">
        <Text className="font-body text-sm text-muted">New to LUXE? </Text>
        <Link href="/sign-up" replace>
          <Text className="font-body-semibold text-sm text-gold">Create account</Text>
        </Link>
      </View>
    </AuthShell>
  );
}