import time
import inspect
import re
import os
from shutil import copyfile
from subprocess import call
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class Watcher:
    DIRECTORY_TO_WATCH = "./"

    def __init__(self):
        self.observer = Observer()

    def run(self):
      event_handler = Handler("v0.1.xd")
      self.observer.schedule(
        event_handler, 
        self.DIRECTORY_TO_WATCH, 
        recursive = True
      )
      self.observer.start()
      try:
        while True:
          time.sleep(5)
      except:
        self.observer.stop()
        print("Error")

      self.observer.join()


class Handler(FileSystemEventHandler):

    def __init__(self, *files_to_watch):
      self.files_to_watch = files_to_watch

    def on_any_event(self, event):
      output_dir = "C:\\Users\\xelox\\Creative Cloud Files"
      if event.is_directory:
        return None
      
      # elif event.event_type == 'created':
        # Take any action here when a file is first created.

      elif event.event_type == 'modified':
        # Taken any action here when a file is modified.
        pt = re.compile("\.\/(.*)")
        file_name = pt.findall(event._src_path)[0]

        if file_name in self.files_to_watch:
          # print("cp {0} {1}".format(event._src_path, output_dir + "/{}".format(file_name)))
          copyfile(os.path.abspath(event._src_path), os.path.join(output_dir, file_name))
          print("Moving {}".format(file_name))
        
        


if __name__ == '__main__':
  w = Watcher()
  w.run() 
