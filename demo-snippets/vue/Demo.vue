<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="Demo" />
        </ActionBar>

        <StackLayout class="page">
            <Label text="This is a simple demo." />
        </StackLayout>
    </Page>
</template>

<script>

export default {
    async mounted() {
	    console.log("MOUNTED")
    } 
};
</script>

<style lang="scss" scoped>
.page Label {
    font-size: 35;
    horizontal-alignment: center;
    vertical-alignment: center;
    color: #ffffff;
    text-transform: uppercase;
}
</style>