<template>
<div>
    <vs-divider position="left">
        {{category.category_name}}
    </vs-divider>
    <vs-sidebar-item v-for="sub in category.sub_category" index=sub.id>
        {{sub.category_name}}
    </vs-sidebar-item>
    </div>
</template>

<script>
export default {
    props: {
        category : {
            id : Number,
            category_name : String,
            sub_category : [{
                id : Number,
                category_name : String,
            }]
        }
    }
}
</script>

<style>
</style>