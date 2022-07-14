
from django.db.models import Q

from .models import Category,Product

def searchProducts(request):
    query = request.query_params.get('keyword')
    cat_query = request.query_params.get('category')
    min_price = request.query_params.get('minPrice')
    max_price = request.query_params.get('maxPrice')
    rate_query = request.query_params.get('rate')


    # Handel Values
    if query == None:
        query = ''
    if cat_query == None:
        cat_query = ''
    if min_price == None or min_price== '':
        min_price = 0
    if max_price == None or max_price == '':
        max_price = 10000
    if rate_query == None:
        rate_query == ''


    #get ID
    if cat_query:
        cat = Category.objects.get(title=cat_query)


    # KeyWord only
    if query and cat_query == '' and min_price == 0 and max_price == 10000  and rate_query == '':
        products = Product.objects.distinct().filter(Q(name__icontains=query) |
            Q(description__icontains=query))
        return products

    # Category only
    elif query == '' and cat_query and min_price == 0 and max_price == 10000 and rate_query == '':
        products = Product.objects.filter(category=cat.id)
        print(products)
        return products

    # Price Only
    elif query =='' and cat_query == '' and min_price and max_price  and rate_query == '':
        products = Product.objects.distinct().filter(price__lte=max_price,price__gte=min_price)
        return products

    # Rate only
    elif query =='' and cat_query == '' and min_price == 0 and max_price == 10000  and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter(rating__gte=rate_query,rating__lte=rate_plus)
        return products

    # Keyword and Category
    elif query and cat_query and min_price == 0 and max_price == 10000 and rate_query == '':
        products = Product.objects.distinct().filter( Q(name__icontains=query) |
            Q(description__icontains=query)).filter(category=cat.id)
        return products

    # keyword and Price
    elif query and cat_query == '' and min_price and max_price and rate_query == '':
        products = Product.objects.distinct().filter(Q(name__icontains=query) |
            Q(description__icontains=query) and
            Q(price__lte=max_price,price__gte=min_price))
        return products

    # keyword and Rate
    elif query and cat_query == '' and min_price == 0 and max_price == 10000 and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter(Q(name__icontains=query) |
            Q(description__icontains=query) and
            Q(rating__gte=rate_query,rating__lte=rate_plus))
        return products

    # Category and Price
    elif query == '' and cat_query and min_price and max_price  and rate_query == '':
        products = Product.objects.distinct().filter(category=cat.id).filter(price__lte=max_price,price__gte=min_price)
        return products

    # Category and Rate
    elif query == '' and cat_query and min_price== 0 and max_price ==10000  and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter( Q(category=cat.id) and
            Q(rating__gte=rate_query,rating__lte=rate_plus))
        return products

    # Price and Rate
    elif query == '' and cat_query=='' and min_price and max_price and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter(price__lte=max_price,price__gte=min_price).filter(rating__gte=rate_query, rating__lte=rate_plus)
        return products

    # keyword and Category and Price
    elif query and cat_query and min_price and max_price and rate_query == '':
        products = Product.objects.distinct().filter(Q(name__icontains=query) |
            Q(description__icontains=query)).filter(category=cat.id).filter(price__lte=max_price, price__gte=min_price)
        return products

    # keyword and Category and Rate
    elif query and cat_query and min_price == 0 and max_price == 10000 and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter(Q(name__icontains=query) |
            Q(description__icontains=query)).filter(category=cat.id).filter(rating__gte=rate_query, rating__lte=rate_plus)
        return products

    # Category and Price and Rate
    elif query == '' and cat_query and min_price and max_price and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter(category=cat.id).filter(price__lte=max_price, price__gte=min_price).filter(rating__gte=rate_query, rating__lte=rate_plus)
        return products

    # all
    elif query and cat_query and min_price and max_price and rate_query:
        rate_plus = int(rate_query) + 0.99
        products = Product.objects.distinct().filter(category=cat.id).filter(price__lte=max_price, price__gte=min_price).filter(rating__gte=rate_query, rating__lte=rate_plus).filter(Q(name__icontains=query) |
            Q(description__icontains=query))
        return products


    # No Filters
    else:
        return Product.objects.all()







    # if cat_query == '' and query == '' and min_price == '' and max_price == '' and rate_query == '':
    #     print('all')
    #     return Product.objects.all()
    #
    # elif query == '' and cat_query:
    #     product = Product.objects.distinct().filter(
    #         Q(category__in=cat))
    #     print('quer cat')
    #     print(query)
    #     return product
    #
    # elif cat_query == '' and query:
    #     product = Product.objects.distinct().filter(
    #         Q(name__icontains=query) |
    #         Q(description__icontains=query))
    #     print('cat quer')
    #     return product
    #
    # elif rate_query:
    #     rate_plus = int(rate_query) + 0.99
    #     product = Product.objects.filter(rating__gte=rate_query, rating__lte=rate_plus)
    #     print('rate quer')
    #     return product
    #
    # elif min_price and max_price and cat_query:
    #     porduct = Product.objects.filter(price__lte=max_price,price__gte=min_price,category__in=cat)
    #     print('min nad')
    #     return porduct
    #
    # else:
    #     # rate_plus = int(rate_query) + 0.99
    #     product = Product.objects.distinct().filter(
    #         Q(name__icontains=query) |
    #         Q(description__icontains=query) and
    #         Q(category__in=cat) and
    #         Q(price__lte=max_price,price__gte=min_price)
    #         # and Q(rating__gte=rate_query,rating__lte=rate_plus)
    #     )
    #     print('else')
    #     return product


    #query handel
    # def getByKeyword():
    #     product = Product.objects.distinct().filter(Q(name__icontains=query)|
    #         Q(description__icontains=query))
    #     return product
    # def getByCategory():
    #     product = Product.objects.distinct().filter(category__in=cat)
    #     return product
    # def getByPrice():
    #     product = Product.objects.filter(price__lte=max_price,price__gte=min_price)
    #     return product
    # def getByRate():
    #     rate_plus = int(rate_query) + 0.99
    #     product = Product.objects.distinct().filter(rating__gte=rate_query, rating__lte=rate_plus)
    #     return product
    #
    # def getBy_Keyword_Category():
    #     product = Product.objects.distinct().filter(
    #             Q(name__icontains=query) and
    #             Q(description__icontains=query))
    #     return product


    # return product