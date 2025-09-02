// Custom Clerk configuration with Maikekai Surf theme
export const clerkConfigCustom = {
  appearance: {
    baseTheme: undefined, // Use custom theme
    variables: {
      // Primary colors - Surf Blue theme
      colorPrimary: '#55ACD8',
      colorPrimaryText: '#FFFFFF',
      
      // Background colors
      colorBackground: '#FFFFFF',
      colorBackgroundSecondary: '#EEF4FF',
      
      // Text colors
      colorText: '#0E3244',
      colorTextSecondary: '#2B96CB',
      colorTextTertiary: '#666666',
      
      // Border colors
      colorBorder: '#E5E7EB',
      colorBorderSecondary: '#55ACD8',
      
      // Success/Error colors
      colorSuccess: '#10B981',
      colorSuccessText: '#FFFFFF',
      colorDanger: '#EF4444',
      colorDangerText: '#FFFFFF',
      
      // Input colors
      colorInputBackground: '#FFFFFF',
      colorInputText: '#0E3244',
      colorInputBorder: '#D1D5DB',
      colorInputBorderFocus: '#55ACD8',
      
      // Button colors
      colorButtonBackground: '#55ACD8',
      colorButtonBackgroundHover: '#2B96CB',
      colorButtonText: '#FFFFFF',
      colorButtonSecondaryBackground: '#FFDA78',
      colorButtonSecondaryBackgroundHover: '#F59E0B',
      colorButtonSecondaryText: '#0E3244',
    },
    elements: {
      // Custom button styles
      formButtonPrimary: {
        backgroundColor: '#55ACD8',
        color: '#FFFFFF',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        padding: '12px 24px',
        '&:hover': {
          backgroundColor: '#2B96CB',
        },
      },
      formButtonSecondary: {
        backgroundColor: '#FFDA78',
        color: '#0E3244',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        padding: '12px 24px',
        '&:hover': {
          backgroundColor: '#F59E0B',
        },
      },
      // Custom input styles
      formFieldInput: {
        borderRadius: '8px',
        border: '1px solid #D1D5DB',
        fontSize: '16px',
        padding: '12px 16px',
        '&:focus': {
          borderColor: '#55ACD8',
          boxShadow: '0 0 0 3px rgba(85, 172, 216, 0.1)',
        },
      },
      // Custom card styles
      card: {
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
      },
      // Custom header styles
      headerTitle: {
        fontFamily: 'Roboto Slab, serif',
        fontSize: '28px',
        fontWeight: '700',
        color: '#0E3244',
      },
      headerSubtitle: {
        fontFamily: 'Work Sans, sans-serif',
        fontSize: '16px',
        color: '#666666',
      },
      // Magic Link specific styles
      emailCodeButton: {
        backgroundColor: '#55ACD8',
        color: '#FFFFFF',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        padding: '12px 24px',
        '&:hover': {
          backgroundColor: '#2B96CB',
        },
      },
      emailCodeInput: {
        borderRadius: '8px',
        border: '1px solid #D1D5DB',
        fontSize: '16px',
        padding: '12px 16px',
        '&:focus': {
          borderColor: '#55ACD8',
          boxShadow: '0 0 0 3px rgba(85, 172, 216, 0.1)',
        },
      },
      emailCodeResendButton: {
        color: '#55ACD8',
        fontSize: '14px',
        textDecoration: 'underline',
        '&:hover': {
          color: '#2B96CB',
        },
      },
    },
    layout: {
      // Custom layout settings
      socialButtonsPlacement: 'bottom' as const,
      showOptionalFields: true,
      logoPlacement: 'inside' as const,
    },
  },
  // Localization
  localization: {
    locale: 'es',
    labels: {
      signIn: {
        title: 'Iniciar Sesión',
        subtitle: 'Accede a tu cuenta de Maikekai Surf',
        emailAddressLabel: 'Email',
        passwordLabel: 'Contraseña',
        forgotPasswordLabel: '¿Olvidaste tu contraseña?',
        signInButtonLabel: 'Iniciar Sesión',
        signUpLinkLabel: '¿No tienes cuenta?',
        signUpLinkText: 'Regístrate aquí',
        // Magic Link labels
        emailCodeButtonLabel: 'Enviar enlace mágico',
        emailCodeInputLabel: 'Código de verificación',
        emailCodeResendButtonLabel: 'Reenviar enlace',
        emailCodeFormTitle: 'Verifica tu email',
        emailCodeFormSubtitle: 'Te hemos enviado un enlace mágico a tu email',
      },
      signUp: {
        title: 'Crear Cuenta',
        subtitle: 'Únete a la familia Maikekai Surf',
        emailAddressLabel: 'Email',
        passwordLabel: 'Contraseña',
        confirmPasswordLabel: 'Confirmar Contraseña',
        firstNameLabel: 'Nombre',
        lastNameLabel: 'Apellido',
        signUpButtonLabel: 'Crear Cuenta',
        signInLinkLabel: '¿Ya tienes cuenta?',
        signInLinkText: 'Inicia sesión aquí',
        // Magic Link labels
        emailCodeButtonLabel: 'Enviar enlace mágico',
        emailCodeInputLabel: 'Código de verificación',
        emailCodeResendButtonLabel: 'Reenviar enlace',
        emailCodeFormTitle: 'Verifica tu email',
        emailCodeFormSubtitle: 'Te hemos enviado un enlace mágico a tu email',
      },
    },
  },
}
