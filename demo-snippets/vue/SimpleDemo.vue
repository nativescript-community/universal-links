<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="Demo" />
        </ActionBar>

        <StackLayout class="page">
            <Label text="This demo must be configured for it to work. Please look at README." />
        </StackLayout>
    </Page>
</template>

<script>
import { getUniversalLink, registerUniversalLinkCallback } from '@nativescript-community/universal-links';
export default {
    async mounted() {
        registerUniversalLinkCallback((ul) => {
            console.log(JSON.stringify(ul));
        });
        // const ul = getUniversalLink();
        // alert(JSON.stringify(ul))
        // console.log(ul);
    }
};
</script>

<style lang="scss" scoped></style>
