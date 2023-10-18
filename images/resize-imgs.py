from PIL import Image
import os

path = "./"
large_folder = "/lg"
medium_folder = "/md"
small_folder = "/sm"
tiny_folder = "/ty"

# resize_ratio = 0.5  # where 0.5 is half size, 2 is double size

has_medium = True
has_small = True
has_tiny = True

tiny_width = 90
small_width = 400
medium_ratio = 0.5

def resize_aspect_fit():
    dirs = os.listdir(path)
    print(dirs)
    for dir in dirs :
        folderpath = path + dir + large_folder
        if(os.path.isdir(folderpath)):
          items = os.listdir(folderpath)
          if( not os.path.isdir(path + dir + medium_folder)):
              os.mkdir(path + dir + medium_folder)
          if( not os.path.isdir(path + dir + small_folder)):
              os.mkdir(path + dir + small_folder)
          if( not os.path.isdir(path + dir + tiny_folder)):
              os.mkdir(path + dir + tiny_folder)
          for item in items:
              filepath = path+dir+large_folder+"/"+item
              print(filepath)
              if os.path.isfile(filepath):
                  image = Image.open(filepath)
                  
                  if(has_medium):
                    medium_height = int(image.size[0]*medium_ratio) 
                    medium_width = int(image.size[1]*medium_ratio)
                    medium_image = image.resize((medium_height, medium_width))
                    medium_filepath = path+dir+medium_folder+"/"+item
                    medium_image.save(medium_filepath, 'JPEG', quality=90)

                  if(has_small):
                    small_ratio = small_width/image.size[1]
                    small_height = int(image.size[0]*small_ratio)
                    small_image = image.resize((small_height, small_width))
                    small_filepath = path+dir+small_folder+"/"+item
                    small_image.save(small_filepath, 'JPEG', quality=90)

                  if(has_tiny):
                    tiny_ratio = tiny_width/image.size[1]
                    tiny_height = int(image.size[0]*tiny_ratio)
                    tiny_image = image.resize((tiny_height, tiny_width))
                    tiny_filepath = path+dir+tiny_folder+"/"+item
                    tiny_image.save(tiny_filepath, 'JPEG', quality=90)


resize_aspect_fit()