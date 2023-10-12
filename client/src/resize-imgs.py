from PIL import Image
import os

path = "../public/imgs/Large/"
medium_path = "../public/imgs/Medium/"
small_path = "../public/imgs/Small/"
tiny_path = "../public/imgs/Tiny/"

# resize_ratio = 0.5  # where 0.5 is half size, 2 is double size

has_medium = False
has_small = False
has_tiny = True

tiny_width = 90
small_width = 400
medium_ratio = 0.5

def resize_aspect_fit():
    dirs = os.listdir(path)
    for dir in dirs :
        items = os.listdir(path+dir)
        if( not os.path.isdir(small_path + dir)):
            os.mkdir(small_path + dir)
        if( not os.path.isdir(tiny_path + dir)):
            os.mkdir(tiny_path + dir)
        for item in items:
            # print(path+dir+item)
            if os.path.isfile(path+dir+"/"+item):
                print(path+dir+"/"+item)
                image = Image.open(path+dir+"/"+item)
                # file_path, extension = os.path.splitext(path+item)
                
                if(has_medium):
                  medium_height = int(image.size[0]*medium_ratio) 
                  medium_width = int(image.size[1]*medium_ratio)
                  medium_image = image.resize((medium_height, medium_width))
                  medium_image.save(medium_path + dir + "/" + item, 'JPEG', quality=90)

                if(has_small):
                  small_ratio = small_width/image.size[1]
                  small_height = int(image.size[0]*small_ratio)
                  small_image = image.resize((small_height, small_width))
                  small_image.save(small_path + dir + "/" + item, 'JPEG', quality=90)

                if(has_tiny):
                  tiny_ratio = tiny_width/image.size[1]
                  tiny_height = int(image.size[0]*tiny_ratio)
                  tiny_image = image.resize((tiny_height, tiny_width))
                  tiny_image.save(tiny_path + dir + "/" + item, 'JPEG', quality=30)


resize_aspect_fit()