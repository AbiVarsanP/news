from django.contrib import admin
from .models import Article, Comment
# Register your models here.

    
class CommentAdmin(admin.TabularInline):
    model = Comment
    extra = 0

class ArticleAdmin(admin.ModelAdmin):
    inlines = [CommentAdmin]
    list_display = [
        "title",
        "body",
        "author",
    ]
    
admin.site.register(Article, ArticleAdmin)
admin.site.register(Comment)